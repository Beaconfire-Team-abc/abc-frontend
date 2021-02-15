import { useFormik } from 'formik';
import * as Yup from "yup";

function ProfileForm(props) {

    const schema = Yup.object({
        name: Yup.string().required("Required"),
        phoneNumber: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        contactName: Yup.string().required("Required"),
        contactRelationship: Yup.string().required("Required")
    });
    
    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "",
            email: "",
            address: "",
            contactName: "",
            contactRelationship: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
            // props.addNewTask(values);
            // formik.resetForm({
            //     task: "",
            //     dayTime: "",
            //     reminder: false
            // });
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
                    placeholder="Enter Name" 
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
                    placeholder="Enter Phone Number" 
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
                    placeholder="Enter Email" 
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
                    placeholder="Enter Address" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? <div style={{color: 'red'}}>{formik.errors.address}</div>: null}
            </div>

            <br></br>
            <h5>Emergency Contact</h5>

            <div className="form-group">
                <label>Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contactName" 
                    placeholder="Enter Name" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactName}
                />
                {formik.touched.contactName && formik.errors.contactName ? <div style={{color: 'red'}}>{formik.errors.contactName}</div>: null}
            </div>

            <div className="form-group">
                <label>Relationship</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="contactRelationship" 
                    placeholder="Enter Relationship" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactRelationship}
                />
                {formik.touched.contactRelationship && formik.errors.contactRelationship ? <div style={{color: 'red'}}>{formik.errors.contactRelationship}</div>: null}
            </div>
        
            <button type="submit" className="btn btn-dark btn-block">Save Profile</button>
        </form>
    );
}

export default ProfileForm;