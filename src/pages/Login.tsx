import { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";

const Login = (props: {setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",   //get the authentication cookie and use
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email,
        password,
      })
    });

    const data = await resp.json();
    setRedirect(true);    
    props.setName(data.name);
  }

  if (redirect) {
    return <Redirect to="/" />
  }
  
  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <input type="email" className="form-control" placeholder="name@example.com" required
        onChange={e => setEmail(e.target.value)}
      />

      <input type="password" className="form-control" placeholder="Password" required
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  );
};

export default Login;
