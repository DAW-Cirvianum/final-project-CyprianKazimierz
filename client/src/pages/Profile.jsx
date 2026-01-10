import "../css/index.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showError, formatDateDMY, isAdult, isFutureDate, formatDateForInput } from "../general";

export default function Profile() {
  const { user,profile } = useContext(AuthContext);

  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmation_password, setPas] = useState("");
  const [born_date, setBornDate] = useState(user.born_date);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    if (isFutureDate(born_date)) {
      showError("The date cannot be in the future");
      return;
    } else if (!isAdult(formatDateForInput(born_date))) {
      showError("You must be at least 18 years old");
      return;
    }
    //create user
    let newUser = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirmation_password,
      born_date: born_date,
      avatar: avatar,
      role: "user",
    };

    const response = await profile(newUser);

    if (!response.ok) {
      if(response.status == 401){
        showError("Token expires");
        setTimeout(()=>{navigate("/home");},2000);
        return;
      }
      if (response.status == 422) {
        console.log(response.error);
        const errors = Object.values(response.error.error);
        errors.forEach((messages, index) => {
          messages.forEach((msg) => {
            showError(msg, index);
          });
        });
        return;
      }
      return;
    }

    toast.success("Profile updated successfully", {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 3200);
  };

  return (
    <div className="container mx-auto my-10 flex justify-center">
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>Profile</h2>

        <div className="mb-4 flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Your name"
            pattern="^[a-zA-Z ]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            name="surname"
            value={surname}
            id="surname"
            placeholder="Your Surname"
            pattern="^[a-zA-Z]{3,25}$"
            maxLength="25"
            title="Only maj and min letters, min 3 chars"
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            id="username"
            name="username"
            pattern="^[a-zA-Z0-9._]{3,20}$"
            title="Please introduce the username(Maj Min and Numbers, min 3 chars)"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            placeholder="Your email"
            pattern="^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$"
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="password">Password (optional):</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="confirmation_password">Repeat the password (optional):</label>
          <input
            type="password"
            placeholder="Repeat the password"
            id="confirmation_password"
            name="confirmation_password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            onChange={(e) => setPas(e.target.value)}
            
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="born_date">Born date:</label>
          <input
            type="date"
            id="born_date"
            name="born_date"
            title="Introduce you born date"
            value={born_date}
            onChange={(e) => {
              setBornDate(e.target.value);
            }}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
