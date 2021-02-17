import React from 'react';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/index'
import { Container } from 'react-bootstrap';


class Profile extends React.Component {
    state = {
        isLoading: true
    };

    finishLoading = () => {
        this.setState({isLoading: false});
    };

    componentDidMount() {
        this.props.fetchProfile(this.props.userId);
        this.finishLoading();
    }

    render() {
        return (
            <div>
                <Container>
                    <div>
                        {
                            this.props.isLoading?
                            <div className="d-flex align-items-center">
                                <strong>Loading...</strong>
                                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                            </div>
                            :<div><ProfileForm profile={this.props.profile} userId={this.props.userId}/> </div>
                        }
                    </div>
                </Container>
            </div>
        );
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