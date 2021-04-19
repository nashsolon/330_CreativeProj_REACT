import { Box, BackButton } from '../items';

function CreateScreen() {
    return (
        <div>
            <h1>Create</h1>
            <Box name="Login" just="right"></Box>
            <Box name="SignUp" just="left"></Box>
            <BackButton page="start"></BackButton>
        </div>
    )
}

export default CreateScreen;