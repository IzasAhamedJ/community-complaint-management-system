import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Button } from '../../Components/Button';
import { useNavigate } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { axios } = useAppContext();
    const { id } = useParams();
    const [committeeMember, setCommitteeMember] = useState(null);
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken) : null;

    const navigate=useNavigate();

    const fetchUsers = async () => {
        if (!token) return toast.error('User not logged in.');

        setLoading(true);
        try {
            const { data: response } = await axios.get('/api/user/getUser', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!id) {
                setUsers(response.data);
            }
            else {
                const filterData = response.data.filter(data => data.role == 'committee');
                setUsers(filterData)
            }

        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to fetch user details.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [axios]);


    const updateRole = async (id) => {
        setLoading(true);
        try {
            const { data: response } = await axios.put(`/api/user/updateRole/${id}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.success) {
                toast.success('Role updated successfully');
                await fetchUsers();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update role');
        } finally {
            setLoading(false);
        }
    };



    const handleCommittee = (memberId) => {
        if (id) {
            setCommitteeMember(memberId)
        }
    }

    const assignToCommittee = async () => {
          setLoading(true)
        try {
            const { data: response } = await axios.post(`/api/assignComplaint/${id}/${committeeMember}`)

            if (response.success) {
                toast.success(response.message);
                setTimeout(()=>{
                        setLoading(false);
                        navigate('/app/admin/view-user-complaints')
                },2000)
            }
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }


    if (loading && users.length === 0) {
        return <p>Loading user details...</p>;
    }

    if (!users || users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <div style={styles.container} className=''>
            <div className="row">
                {users.map((user) => (
                    <div key={user._id} className="col-md-4 mb-3">
                        <Card style={{
                            ...styles.card,
                            border:
                                committeeMember === user._id
                                    ? '2px solid #007bff'
                                    : '',
                        }} className="rounded-4" onClick={() => handleCommittee(user._id)}>
                            <div className="p-2">
                                <p><strong>Name:</strong> {user.username}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Role:</strong> {user.role}</p>

                                <div>
                                    {
                                        user.role == 'member' && <Button
                                            variant="primary"
                                            type="submit"
                                            isLoading={loading}
                                            emitBtn={() => updateRole(user._id)}
                                        >
                                            Join Committee
                                        </Button>
                                    }

                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            {
                id && <div className='position-absolute end-0 bottom-0 p-4'>
                    <Button disabled={!committeeMember}  isLoading={loading} emitBtn={assignToCommittee}>Submit To Assign</Button>
                </div>
            }

        </div>
    );
}

const styles = {
    card: {
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        height:'220px'
    },
    container: {
        padding: '1rem',
    },
};

export default Users;
