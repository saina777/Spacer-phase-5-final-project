import uuid
import random
from datetime import datetime, timedelta
from decimal import Decimal
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.base import Base
from app.database.models import User, Space, Booking, SpaceImage
import argparse


# =========================
# Sample Data Pools
# =========================

NAMES = [
    "Alice Mwangi",
    "Brian Otieno",
    "Cynthia Wanjiku",
    "David Kimani",
    "Esther Njeri"
]

CITIES = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Eldoret",
    "Nakuru"
]

SPACE_TITLES = [
    "Modern Co-working Space",
    "Executive Conference Room",
    "Private Office Suite",
    "Creative Event Hall",
    "Open Desk Workspace"
]

SPACE_IMAGES = [
    # Conference rooms
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",

    # Co-working spaces
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9",

    # Private offices
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c",
    "https://images.unsplash.com/photo-1507209696998-3c532be9b2b5",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2",

    # Event halls
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    "https://images.unsplash.com/photo-1515169067865-5387ec356754",
    "https://images.unsplash.com/photo-1503424886307-b090341d25d1",
]


def seed_db(db_url, clear_only=False):
    print(f"Connecting to database at {db_url}...")
    engine = create_engine(db_url)

    print("Dropping all existing tables...")
    Base.metadata.drop_all(bind=engine)

    if clear_only:
        print("Database cleared successfully.")
        return

    print("Creating tables...")
    Base.metadata.create_all(bind=engine)

    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # =========================
        # Create Users
        # =========================
        users = []

        admin = User(
            name="Admin User",
            email="admin@example.com",
            password_hash="hashed_password",
            role="ADMIN"
        )

        client = User(
            name="Test Client",
            email="client@example.com",
            password_hash="hashed_password",
            role="CLIENT"
        )

        users.extend([admin, client])

        for i in range(5):
            user = User(
                name=random.choice(NAMES),
                email=f"user{i}@example.com",
                password_hash="hashed_password",
                role=random.choice(["CLIENT", "OWNER"])
            )
            users.append(user)

        session.add_all(users)
        session.commit()
        print(f"Created {len(users)} users.")

        # =========================
        # Create Spaces WITH Images
        # =========================
        spaces = []

        for i in range(10):
            space = Space(
                title=random.choice(SPACE_TITLES),
                description="Spacious, clean, and well-equipped workspace.",
                location=random.choice(CITIES),
                price_per_hour=Decimal(random.uniform(10, 50)).quantize(Decimal("0.00")),
                price_per_day=Decimal(random.uniform(50, 200)).quantize(Decimal("0.00")),
                status="AVAILABLE"
            )

            session.add(space)
            session.flush()  # Generates space.id

            # Add 2–4 images per space
            for _ in range(random.randint(2, 4)):
                image = SpaceImage(
                    space_id=space.id,
                    image_url=random.choice(SPACE_IMAGES)
                )
                session.add(image)

            spaces.append(space)

        session.commit()
        print(f"Created {len(spaces)} spaces with images.")

        # =========================
        # Create Bookings
        # =========================
        bookings = []
        client_users = [u for u in users if u.role == "CLIENT"]

        for _ in range(10):
            user = random.choice(client_users)
            space = random.choice(spaces)

            start_time = datetime.utcnow() + timedelta(days=random.randint(1, 30))
            end_time = start_time + timedelta(hours=random.randint(1, 8))

            booking = Booking(
                user_id=user.id,
                space_id=space.id,
                start_time=start_time,
                end_time=end_time,
                total_amount=Decimal(random.uniform(20, 500)).quantize(Decimal("0.00")),
                status=random.choice(["PENDING", "CONFIRMED", "CANCELLED"])
            )

            bookings.append(booking)

        session.add_all(bookings)
        session.commit()
        print(f"Created {len(bookings)} bookings.")

        print("Database seeded successfully!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        session.rollback()
    finally:
        session.close()


if __name__ == "_main_":
    parser = argparse.ArgumentParser(description="Manage mock databases (seed/clear).")
    parser.add_argument("--db", type=str, help="Database filename (e.g., spacer.db)")
    parser.add_argument("--clear", action="store_true", help="Clear the database only")

    args = parser.parse_args()

    if args.db:
        db_url = f"sqlite:///./{args.db}"
        seed_db(db_url, clear_only=args.clear)
    else:
        seed_db("sqlite:///./spacer.db", clear_only=args.clear)