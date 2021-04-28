import { NameForm, BackButton } from '../items';

function NameScreen(props) {
    return (
        <div className="enterName">
            <BackButton page="join"></BackButton>
            <div id="text">
                <strong>Enter Name:</strong>
            </div>
            <NameForm></NameForm>
        </div>
    );
}

export default NameScreen;