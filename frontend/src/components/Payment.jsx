import axios from 'axios';

const Payment = ({ booking }) => {

    const handleCheckout = async () => {

        if (!booking || !booking.fare) {
            console.error("Invalid booking data");
            return;
          }

          if(booking.bookingStatus !== "Approved") {
                console.error("Invalid booking!!!");
                alert("Booking Details Not Approved");
                return;
          }
       
        axios.post('http://localhost:5000/create-checkout-session', { fare:  booking.fare})
          .then((res) => {
            console.log("Checkout session Successful~");
            const body = res.data;
            window.location.href = body.url
          })
          .catch((err) => console.log("Checkout session Error", err));
    
        }
  return (
    <>
      <button  className="btn btn-primary btn-sm" onClick={handleCheckout}>Payment</button>
    </>
  )
  }



export default Payment;
