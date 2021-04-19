import { NameForm, BackButton } from '../items';

function NameScreen(props) {
    return (
        <div className="enterName">
            <div id="text">
                <strong>Enter Name:</strong>
            </div>
            <NameForm></NameForm>
            <BackButton page="join"></BackButton>
        </div>
    );
}

export default NameScreen;