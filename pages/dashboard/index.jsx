import Link from "next/link"
import { useState } from "react"


const DashBoard = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        password: ''
    })

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        email: ''
    })


    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const saveHandler = async () => {
        if (formData.name && formData.lastName && formData.password) {
            const res = await fetch('/api/users/updateuser', {
                method: "POST",
                body: JSON.stringify({ data: formData }),
                headers: { 'Content-Type': 'application/json' }

            });

            const data = await res.json();
            console.log(data);
            if (data.status === 'success') {
                setUser({
                    name: data.user.name,
                    lastName: data.user.lastName,
                    email: data.user.email
                })
            }
        }
        setFormData({
            name: '',
            lastName: '',
            password: ''
        })
    }

    return (
        <>
            <h3>Email: </h3>
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


// export async function getServerSideProps(context) {
//     const { token } = context.req.cookies;
//     const secretKey = process.env.SECRET_KEY;
//     const tokenVerifyResult = verifyToken(token, secretKey);

//     if (!tokenVerifyResult) {
//         return {
//             redirect: { destination: '/users/signIn', premanant: false }
//         }
//     }

//     return {
//         props: {
//             data: tokenVerifyResult.email
//         }
//     }
// }