import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import {loadUser} from '../thunks/thunks';
import { useParams } from 'react-router-dom';

const Summy = ({user, startLoadingUser}) => {
    const {userId} = useParams();
    useEffect(()=>{
        startLoadingUser(userId);
    },[])

    const headers = ["WeekEnding", "Total Hours", "Submission Status", "Approval Status", "Option", "Comment"];
    const heads = headers.map((header, index)=> <th key={index}>{header}</th>);

    const context = (
        <Table>
            <thead>
                <tr>
                <th>#</th>
                {heads}
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                
                </tr>
            </tbody>
        </Table>
    )
    return context;
}

const mapStateToProps = state => ({
    user: state.user,

});
const mapDispatchToProps = dispatch =>({
    startLoadingUser: (userId) => dispatch(loadUser(userId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Summy);

