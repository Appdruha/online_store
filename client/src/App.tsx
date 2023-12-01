import {useAppDispatch, useAppSelector} from "./hooks/redux-hooks";
import {userSlice} from "./store/reducers/UserSlice";

function App() {
    const {AC} = userSlice.actions
    const {isAuth} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    return (
        <div>
            <h1>{`${isAuth}`}</h1>
            <button onClick={() => dispatch(AC(!isAuth))}>Login</button>
        </div>
    );
}

export default App;
