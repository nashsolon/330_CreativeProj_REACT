import { JoinForm, BackButton } from '../items';

function JoinScreen(props) {
    return (
        <div className="enterCode">
            <div id="text">
                <strong>Enter Code:</strong>
            </div>
            <JoinForm></JoinForm>
            <BackButton page="start"></BackButton>
        </div>
    );
}

export default JoinScreen;