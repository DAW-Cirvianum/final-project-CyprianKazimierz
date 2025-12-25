import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation_password, setPas] = useState("");
  const [born_date, setBornDate] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  /**
   *
   * @param {string} dateString Date string format
   * @returns Returns a string with this format dd/mm/yyyy
   */
  const formatDateDMY = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  /**
   *
   * @param {string} dateString Date string format
   * @returns   true if is 18 or older, fals eif is younger
   */
  const isAdult = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  };

  /**
   *
   * @param {string} dateString  Date in string format
   * @returns True if the data send is bigger thant current data, else False
   */
  const isFutureDate = (dateString) => {
    return new Date(dateString) > new Date();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //

    if (isFutureDate(born_date)) {
      setError("The date cannot be in the future");
      return;
    } else if (!isAdult(born_date)) {
      setError("You must be at least 18 years old");
      return;
    }
    //create user
    let user = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      password_confirmation: confirmation_password,
      born_date: formatDateDMY(born_date),
      avatar: avatar,
      role: "user",
    };

    const ok = await register(user);

    if (!ok) {
      setError("Credencials incorrectes");
      return;
    }

    setSuccess("User has been created");
    navigate("/home/login");
  };
  return (
    <div className="container mx-auto my-10 flex justify-center">
      <form className="userForm w-96 h-auto p-14" onSubmit={handleSubmit}>
        <h2>Sing Up</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}

        <div className="mb-4 flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Your name"
            pattern="^[a-zA-Z]{3,25}$"
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="confirmation_password">Repeat the password:</label>
          <input
            type="password"
            placeholder="Repeat the password"
            id="confirmation_password"
            name="confirmation_password"
            pattern="^[a-zA-Z0-9]{6,20}$"
            title="Please introduce a valid password, the password must contain (Maj Min Numbers and min og 6 chars and a max of 20)"
            maxLength="20"
            value={confirmation_password}
            onChange={(e) => setPas(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="born_date">Born date:</label>
          <input
            type="date"
            id="born_date"
            name="born_date"
            title="Introduce you born date"
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
