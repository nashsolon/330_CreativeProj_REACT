import { JoinForm, BackButton } from '../items';

function JoinScreen(props) {
    return (
        <div className="enterCode">
            <BackButton page="start"></BackButton>
            <div id="text">
                <strong>Enter Code:</strong>
            </div>
            <JoinForm></JoinForm>

        </div>
    );
}

export default JoinScreen;