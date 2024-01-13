import { BookFormContainer2 } from '../styles/GeneralStyledComponents';
import { useState, useContext, useEffect } from 'react';
import { ScrollContext } from '../App';
import axios from 'axios';
import Endpoints from '../utils/APIS';
import { LIST_OF_PRODUCTS } from '../utils/LIST_OF_PRODUCTS';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookForm2() {
    const { setOpen, setResponseMessage } = useContext(ScrollContext);
    const params = useParams();
  
    const [isProcessing, setIsProcessing] = useState(false);

    const [product, setProduct] = useState({});
    const [formInput, setFormInput] = useState({
        amount: 0,
        price: 0,
        deliveryLocation:'',
        deliveryGoogleMapLocation: ''
    });

    useEffect(() => {
      setProduct(LIST_OF_PRODUCTS.find(product => product.id === params.productId));
    },[params.productId]);
    

    const handleFormInput = ({ currentTarget: input }) => {
        var total = product.price * input.value;
        if (input.name === 'amount') {
            setFormInput({ ...formInput, price: total, amount: input.value });
        } else {
            setFormInput({ ...formInput, [input.name]: input.value });
        }
    }

    const submitPayment = (e) => {
        e.preventDefault();

        setIsProcessing(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        formInput.requestingUserId = userInfo.id;
        formInput.requestingUserEmail = userInfo.email;
        formInput.requestingUserPhone = userInfo.phone;
        formInput.requestingUserName = userInfo.fullName;

        console.log(Number(formInput.amount));

        axios.post(Endpoints.APIS.checkout, { priceId: product.priceId, amount: Number(formInput.amount), product: product.id })
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                console.log(response.data);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing(false);
                setResponseMessage({ message: error.response.data.msg, severity:'error'})
                setOpen(true);
            }
        })

        // axios.post(Endpoints.APIS.jobApis.add, formInput)
        // .then(response => {
        //     setTimeout(() => {
        //         if (response.status === 201) {
        //             setIsProcessing(false);
        //             setResponseMessage('Redirecting to payment handler...');
        //             window.location.replace('https://buy.stripe.com/test_6oE6rB0Xjc0G7IY4gg');
        //         }
        //     }, 3000);
        // })
        // .catch(error => {
        //     if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        //         setIsProcessing(false);
        //         setResponseMessage({ message: error.response.data.msg, severity:'error'})
        //         setOpen(true);
        //     }
        // })
    };

    
    return (
        <BookFormContainer2 onSubmit={submitPayment}>
            <div className='top-inputs'>
                <div className="form-input-container2">
                    <label htmlFor='deliveryLocation'>Delivery location*</label>
                    <input type="text" required name="deliveryLocation" value={formInput.deliveryLocation} placeholder="Delivery location" onChange={handleFormInput} />
                </div>
                <div className="form-input-container2">
                    <label htmlFor='deliveryGoogleMapLocation'>Google Maps location</label>
                    <input type="text" id='deliveryGoogleMapLocation' name="deliveryGoogleMapLocation" value={formInput.deliveryGoogleMapLocation} placeholder="Delivery google maps location" onChange={handleFormInput} />
                </div>
            </div>
            <div className='formContainer'>
                <div className='left' style={{ width: '75%', display: 'flex', alignItems:"flex-start", justifyContent:"space-between", gap: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ color: 'black' }}>Product</p>
                        <div style={{ display: 'flex',gap: '20px' }}>
                            <img src={product.image} alt='' style={{ width: '100px', padding: '5px', border: '1px solid gray', borderRadius: '10px' }}/>
                            <div>
                                <p style={{ color: 'black'}}>{product.name}</p>
                                <span>{product.price} Frw</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ color: 'black' }}>Quantity</p>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <input 
                                style={{ width: '100px' }}
                                type="number" 
                                name='amount' 
                                min={0}
                                placeholder="Amount" 
                                required
                                value={formInput.amount}
                                onChange={handleFormInput}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <p style={{ color: 'black' }}>Quantity</p>
                        <p style={{ color: 'black', fontSize: '100%' }}>{formInput.price}</p>
                    </div>
                </div>
                <div className='right' style={{ width: '23%', padding: '10px', border: '1px solid #b3cccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <b>Summary</b>
                    <div style={{ marginBottom: '10px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p style={{ color: 'black', width: '50%' }}>Delivery Charge: </p>
                        <b style={{ color: 'black', width: '50%' }}>10000 Rwf</b>
                    </div>
                    <div style={{ marginBottom: '10px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p style={{ color: 'black', width: '50%' }}>Grand Total: </p>
                        <b style={{ color: 'black', width: '50%' }}>{10000 + formInput.price} Rwf</b>
                    </div>
                    <button type='submit' style={{ cursor: 'pointer', width: '100%', padding: '10px 15px', background: 'black', color: 'white', fontSize: '100%', border: 'none', textDecoration: 'none', borderRadius: '10px' }}>Check out now</button>
                </div>
            </div>
        </BookFormContainer2>
    );
}