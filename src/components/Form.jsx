import React, { useEffect, useState } from 'react'
import './Form.css'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuArrowDownUp } from "react-icons/lu";

function Form() {
    const [data, setdata] = useState({})
    const [list, setlist] = useState([])
    let [hob, setHob] = useState([]);
    const [pos, setpos] = useState(-1)
    const [search, setsearch] = useState("")
    const [errors, seterrors] = useState({})
    const [showpassword, setshowpassword] = useState(false)
    // ==============================================useeffect
    useEffect(() => {
        let newlist = JSON.parse(localStorage.getItem("records")) || []
        setlist(newlist)
    }, [setlist])
    // =====================================================Errors
    // let inputerrors=()=>{
    //     let err={};
    //     if (!data.name) {
    //         err.info="usernamerequired"
    //     }
    //     seterrors(err.info)


    // }
    // =============================================input
    let setinput = (e) => {
        let name = e.target.name;
        let value = e.target.value
        let hoData = [...hob];

        if (name == 'hobbies') {
            if (e.target.checked) {
                hoData.push(value);
            }
            else {
                let index = hoData.findIndex((v, i) => v == value);
                hoData.splice(index, 1);
            }
            value = hoData;
            setHob(value);
        }
        setdata({ ...data, [name]: value })
    }
    // ===========================================validation=====
    let validation = () => {
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        let err = {}

        if (!data.fname) {
            err.fname = "Enter proper name"
            // console.log("hhh");
        }
        else if (!(data.fname.length > 2)) {
            err.fname = "Minimum 3 or more character"
        }
        if (!data.email) {
            err.email = "Enter proper Email"
            // console.log("hhh");
        }
        if (!data.city) {
            err.city = "Select proper City"
            // console.log("hhh");
        }
        if (!data.password) {
            err.password = "Enter password"
        }
        else if (!passw.test(data.password)) {
            err.password = "Require one numeric digit,special character,and must be 7-15 character"
        }
        if (!data.gender) {
            err.gender = "Gender require"
        }
        if (!data.phone) {
            err.phone = "enter mobile no"
        }
        if(hob.length ==0){
            err.hobby = "any one of hobby required";
         } 

        return err;
    }

    // ==============================================submit edit
    // ==============================validation
    let submitdata = (e) => {
        e.preventDefault()
        let validationerrors = validation()
        if (Object.keys(validationerrors).length > 0) {
            seterrors(validationerrors)
        }
        // ==============================
        else {
            seterrors({})
            if (pos != -1) {
                list.map((val, i) => {
                    if (i == pos) {
                        list[i] = data
                        localStorage.setItem("records", JSON.stringify([...list]))
                    }
                })
            }
            else {
                // console.log(result);
                let res = [...list, data]
                setlist(res)
                console.log(res);
                localStorage.setItem("records", JSON.stringify(res))
            }
            setdata({})
            setpos(-1)
            setHob([]);
        }
    }
    // ==================================================delete=============
    let remove = (pos) => {
        let removedata = list.filter((val, i) => {
            return pos != i
        })
        setlist(removedata)
        localStorage.setItem("records", JSON.stringify(removedata))
    }
    // ========================================================update===
    let update = (pos) => {
        console.log(pos);
        setpos(pos)
        let updata = list.filter((val, i) => {
            if (i == pos) {
                return val
            }
        })
        console.log(updata[0]);
        setdata(updata[0])
        setHob(record[0]['hobby'])

    }
    // ========================================================search===
    let searchingdata = (e) => {
        let values = e.target.value
        console.log(values);
        setsearch(values)
    }
    // ===========================================================sort===
    const [res, setres] = useState(false)
    let sortby = (type) => {
        let newlist = [...list]
        // =====================================first name
        if (res == false || res == true) {
            if (type == "fname" && res == false) {
                newlist.sort((a, b) => a.fname.localeCompare(b.fname))
                res == true
            }
            else {
                newlist.sort((a, b) => b.fname.localeCompare(a.fname))
            }
        }
        setlist(newlist)
    }
    return (
        <>
            <div className='container'>
                <div>
                    <form action="" metdod='post' onSubmit={(e) => { submitdata(e) }}>
                        <h1>Student Registration</h1>
                        <div>
                            <div className='data'>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="text" className='inputs' placeholder='my first name' name='fname' value={data.fname ? data.fname : ""} onChange={(e) => { setinput(e) }} />
                                        {errors.fname &&
                                            <p style={{ color: "red" }}>{errors.fname}</p>
                                        }
                                    </div>
                                </div>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="text" className='inputs' placeholder='my last name' name='lname' value={data.lname ? data.lname : ""} onChange={(e) => { setinput(e) }} />
                                    </div>
                                </div>
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="email" className='inputs' placeholder='abc@gmail.com' name='email' value={data.email ? data.email : ""} onChange={(e) => { setinput(e) }} />
                                        {errors.email &&
                                            <p style={{ color: "red" }}>{errors.email}</p>
                                        }
                                    </div>
                                </div>
                                {/* ===============================================mobile n0 */}
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <input type="number" className='inputs' placeholder='phone' name='phone' value={data.phone ? data.phone : ""} onChange={(e) => { setinput(e) }} />
                                        {errors.phone &&
                                            <p style={{ color: "red" }}>{errors.phone}</p>
                                        }
                                    </div>
                                </div>
                                {/* ================================================select=========== */}
                                <div className='feilds'>
                                    <div style={{ margin: "15px" }}>
                                        <select name="city" id="" className='inputs' onChange={(e) => { setinput(e) }}>
                                            <option value="">My city</option>
                                            <option value="surat">surat</option>
                                            <option value="mumbai">mumbai</option>
                                            <option value="bengaluru">Bengaluru</option>
                                        </select>
                                        {errors.city &&
                                            <p style={{ color: "red" }}>{errors.city}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ==================================================gender========= */}
                        <div className='borders'>
                            <div className='values'>
                                <h3 style={{ marginBottom: "5px" }}>Gender</h3>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name='gender' value="male" onChange={(e) => { setinput(e) }} />
                                    <h4>Male</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="radio" name='gender' value="female" onChange={(e) => { setinput(e) }} />
                                    <h4>Female</h4>
                                </div>
                                {errors.gender &&
                                    <p style={{ color: "red" }}>{errors.gender}</p>
                                }
                            </div>
                        </div>
                        {/* ==================================================checkbox */}
                        <div className='borders'>
                            <div className='values'>
                                <h3 style={{ marginBottom: "5px" }}>Hobbies</h3>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' value={"Cricket"} checked={hob.includes('Cricket') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <h4>Cricket</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' value={"Football"} checked={hob.includes('Football') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <h4>Football</h4>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" name='hobbies' value={"Chess"} checked={hob.includes('Chess') ? "checked" : ""} onChange={(e) => { setinput(e) }} />
                                    <h4>Football</h4>
                                </div>
                                {errors.hobby &&
                                    <p style={{ color: "red" }}>{errors.hobby}</p>
                                }
                            </div>
                        </div>
                        {/* ============================================================password */}
                        <div className='borders'>
                            <div className='values'>
                                <div style={{ display: "flex" }}>
                                    <input type={showpassword == true ? "text" : "password"} placeholder='Password' style={{ width: "70.6%", marginBottom: "20px", padding: "10px" }} name='password' onChange={(e) => { setinput(e) }} value={data.password ? data.password : ""} />
                                    <div style={{ marginLeft: "10px" }}>
                                        <button onClick={() => { setshowpassword(showpassword == false) }} style={{ height: "65%" }} type='button'>
                                            {/* <input type="checkbox"/> */}
                                            <h3>{showpassword == false ? "show" : "hide"}</h3>
                                        </button>
                                    </div>
                                </div>
                                {errors.password &&
                                    <p style={{ color: "red" }}>{errors.password}</p>
                                }
                                <input type='submit' style={{ width: "100%", padding: "10px" }} value={pos != -1 ? "edit" : "Register"}></input>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            <div className="container-wl">
                {/* ===============================================search */}

                <input type="text" placeholder='search' style={{ marginBottom: "10px", padding: "10px" }} onChange={(e) => { searchingdata(e) }} />

                {/* ============================================ printed data */}
                <table>
                    <tr className='rows'>
                        <th>First Name
                            <button className='btn3' onClick={() => { sortby("fname"); setres(res == false) }}><LuArrowDownUp /></button>
                        </th>
                        <th>Last Name
                            <button className='btn3' onClick={() => { sortby("lname") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Email
                            <button className='btn3' onClick={() => { sortby("email") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Phone
                            <button className='btn3' onClick={() => { sortby("phone") }}><LuArrowDownUp /></button>
                        </th>
                        <th>City
                            <button className='btn3' onClick={() => { sortby("city") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Gender
                            <button className='btn3' onClick={() => { sortby("gender") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Hobbies
                            <button className='btn3' onClick={() => { sortby("hobbies") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Password
                            <button className='btn3' onClick={() => { sortby("password") }}><LuArrowDownUp /></button>
                        </th>
                        <th>Action </th>
                    </tr>
                    {/* </div> */}
                    {/* <div> */}
                    {
                        list
                            .filter((val, i) => {
                                if (search === "") {
                                    return val
                                }
                                else if (val.fname.toLocaleLowerCase().match(search.toLocaleLowerCase())) {
                                    return val
                                }
                            })
                            .map((val, i) => {
                                // console.log(val.hobbies);
                                return (
                                    <>
                                        <tr className='table-data' key={i}>
                                            <td>{val.fname}</td>
                                            <td>{val.lname}</td>
                                            <td>{val.email}</td>
                                            <td>{val.phone}</td>
                                            <td>{val.city}</td>
                                            <td>{val.gender}</td>
                                            <td>{val.hobbies}</td>
                                            <td>{val.password}</td>
                                            <td>
                                                <button className='btn' onClick={() => { update(i) }}><FaEdit /></button>
                                                <button className='btn btn2' onClick={() => { remove(i) }}><RiDeleteBin6Line /></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                    }
                    {/* </div> */}
                </table>

            </div>
        </>
    )
}

export default Form