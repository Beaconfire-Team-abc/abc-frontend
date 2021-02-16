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

    render() {

        const profileContext = <div><ProfileForm profile={this.props.profile}/> </div>;
        const isLoadingMessage = (<div className="d-flex align-items-center">
                                    <strong>Loading...</strong>
                                    <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                                  </div>);
        
        return this.props.isLoading? isLoadingMessage : profileContext;

    }

}

const mapStateToProps = (state) => {
    return { 
        profile: state.profile,
        isLoading: state.profileIsLoading,
     };
};

export default connect(
    mapStateToProps, 
    { fetchProfile }
)(Profile);