import { useFormik } from 'formik';
import { post } from 'jquery';
import { connect } from 'react-redux';
import * as Yup from "yup";
import {postProfile} from "../actions/index"

function ProfileForm({profile, postProfile, userId}) {

    const schema = Yup.object({
        name: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        contact1Name: Yup.string().required("Required"),
        contact1Phone: Yup.string().required("Required"),
        contact2Name: Yup.string().required("Required"),
        contact2Phone: Yup.string().required("Required")
    });
    
    const formik = useFormik({
        initialValues: {
            name: (profile.name === null)? "": profile.name,
            phoneNumber: (profile.cellphone === null)? "": profile.cellphone,
            email: (profile.email === null)? "": profile.email,
            address: (profile.address === null)? "": profile.address,
            contact1Name: (profile.emergencyContacts[0].name === null)? "": profile.emergencyContacts[0].name,
            contact1Phone: (profile.emergencyContacts[0].phone === null)? "": profile.emergencyContacts[0].phone,
            contact2Name: (profile.emergencyContacts[1].name === null)? "": profile.emergencyContacts[1].name,
            contact2Phone: (profile.emergencyContacts[1].phone === null)? "": profile.emergencyContacts[1].phone,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            postProfile(values, userId);
        }
    });

    return (
        <form className="my-3" onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="name" 
                    placeholder="First Name, Last Name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? <div style={{color: 'red'}}>{formik.errors.name}</div>: null}
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="(917)328-7765" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{color: 'red'}}>{formik.errors.phoneNumber}</div>: null}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="email" 
                    placeholder="Email@gmail.com" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
            </div>

            <div className="form-group">
                <label>Address</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="address" 
                    placeholder="(Home Address)81 Shelley Cir, East Windsor, NJ 08520" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? <div style={{color: 'red'}}>{formik.errors.address}</div>: null}
            </div>

            <br></br>
            <h5>Emergency Contact 1</h5>

            <div className="form-group">
                <label>Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contact1Name" 
                    placeholder="First Name, Last Name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact1Name}
                />
                {formik.touched.contact1Name && formik.errors.contact1Name ? <div style={{color: 'red'}}>{formik.errors.contact1Name}</div>: null}
            </div>

            <div className="form-group">
                <label>Cellphone</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contact1Phone" 
                    placeholder="(917)328-7765" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact1Phone}
                />
                {formik.touched.contact1Phone && formik.errors.contact1Phone ? <div style={{color: 'red'}}>{formik.errors.contact1Phone}</div>: null}
            </div>

            <br></br>
            <h5>Emergency Contact 2</h5>

            <div className="form-group">
                <label>Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contact2Name" 
                    placeholder="First Name, Last Name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact2Name}
                />
                {formik.touched.contact2Name && formik.errors.contact2Name ? <div style={{color: 'red'}}>{formik.errors.contact2Name}</div>: null}
            </div>

            <div className="form-group">
                <label>Cellphone</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contact2Phone" 
                    placeholder="(917)328-7765" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact2Phone}
                />
                {formik.touched.contact2Phone && formik.errors.contact2Phone ? <div style={{color: 'red'}}>{formik.errors.contact2Phone}</div>: null}
            </div>
        
            <button type="submit" className="btn btn-dark btn-block">Save Profile</button>
        </form>
    );
}


const mapDispatchToProps = dispatch => ({
    postProfile: (data, userId) => dispatch(postProfile(data, userId))
})

export default connect( null ,mapDispatchToProps )(ProfileForm);