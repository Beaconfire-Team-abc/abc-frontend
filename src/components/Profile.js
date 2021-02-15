import React from 'react';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/index'

class Profile extends React.Component {
    state = {
        isLoading: true
    };

    finishLoading = () => {
        this.setState({isLoading: false});
    };

    componentDidMount() {
        this.props.fetchProfile();
        this.finishLoading();
    }

    // getProfile = () => {
    //     this.props.fetchProfile();
    // };

    render() {
        console.log(this.state.isLoading);
        console.log(this.props.profile.firstName);
        return (
            <div> 
                {/* <div><ProfileForm profile={this.props.profile}/> </div> */}
                {
                    this.state.isLoading && <div> <p>yes</p> </div> 
                }
            </div>
        );
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