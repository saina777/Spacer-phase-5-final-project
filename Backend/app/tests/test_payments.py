import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from app.payments.service import process_payment
from app.database.models import Booking

def test_process_payment_success():
    mock_db = MagicMock()
    mock_user = MagicMock()
    mock_user.id = "user_123"
    booking_id = "booking_123"
    
    mock_booking = MagicMock()
    mock_booking.id = booking_id
    mock_booking.status = "PENDING"
    mock_booking.total_amount = 100.0
    
    # Setup query mock
    mock_query = mock_db.query.return_value
    mock_filter = mock_query.filter.return_value
    mock_filter.first.return_value = mock_booking
    
    with patch("app.payments.service.generate_invoice_number", return_value="INV-TEST-123"):
        result = process_payment(mock_db, mock_user, booking_id)
        
    assert result["status"] == "PAID"
    assert result["invoice_number"] == "INV-TEST-123"
    assert mock_booking.status == "PAID"
    mock_db.commit.assert_called_once()

def test_process_payment_not_found():
    mock_db = MagicMock()
    mock_user = MagicMock()
    mock_user.id = "user_123"
    booking_id = "booking_missing"
    
    # Setup query mock to return None
    mock_query = mock_db.query.return_value
    mock_filter = mock_query.filter.return_value
    mock_filter.first.return_value = None
    
    with pytest.raises(HTTPException) as excinfo:
        process_payment(mock_db, mock_user, booking_id)
    
    assert excinfo.value.status_code == 404
    assert excinfo.value.detail == "Booking not found"

def test_process_payment_already_paid():
    mock_db = MagicMock()
    mock_user = MagicMock()
    mock_user.id = "user_123"
    booking_id = "booking_paid"
    
    mock_booking = MagicMock()
    mock_booking.status = "PAID"
    
    # Setup query mock
    mock_query = mock_db.query.return_value
    mock_filter = mock_query.filter.return_value
    mock_filter.first.return_value = mock_booking
    
    with pytest.raises(HTTPException) as excinfo:
        process_payment(mock_db, mock_user, booking_id)
        
    assert excinfo.value.status_code == 400
    assert excinfo.value.detail == "Booking already paid"
