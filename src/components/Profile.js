import React from 'react';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/index'

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchProfile();
    }

    // getProfile = () => {
    //     this.props.fetchProfile();
    // };

    render() {
        console.log(this.props.profile.firstName);
        return <div><ProfileForm name={this.props.profile.firstName}/> </div>;
    }
    // return (
    //     <div>
    //         <ProfileForm ></ProfileForm> 
    //     </div>
    // );
}

const mapStateToProps = (state) => {
    return { profile: state.profile };
};

export default connect(
    mapStateToProps, 
    { fetchProfile }
)(Profile);