import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const DashBoard = ({ data }) => {
    // const { data, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
    });

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        password: ''
    })

    // useEffect(() => {
    //     if (!data) {
    //         router.replace('/users/signIn');
    //     }
    // }, [])

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const saveHandler = async () => {

    }


    return (
        <>
            <h3>Email: {data.user.email} </h3>
            {user.name && <h3>Name: {user.name}</h3>}
            {user.lastName && <h3>LastName: {user.lastName}</h3>}

            <div className="form-container">
                <h3>Complete your Info</h3>

                <div className="form-group">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={changeHandler} />
                </div>

                <div className="form-group">
                    <input type="text" name="lastName" placeholder="lastName" value={formData.lastName} onChange={changeHandler} />
                </div>

                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={changeHandler} />
                </div>

                <button className="btn" onClick={saveHandler}>Save Changes</button>
            </div>

            <div className="btn-group">
                <Link href='/'>
                    <button className="btn">
                        Home Page
                    </button>
                </Link>
            </div>
        </>
    )

}

export default DashBoard


export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: { destination: '/users/signIn', permanant: false },
        }
    }

    return {
        props: {
            data: session
        }
    }
}