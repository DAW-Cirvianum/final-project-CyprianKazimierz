import { Outlet } from "react-router-dom";

export default function UserLayout(){
return(<>

<div>
    <h1>User layout</h1>
</div>
<div>
    <Outlet/>
</div>
</>)
}

