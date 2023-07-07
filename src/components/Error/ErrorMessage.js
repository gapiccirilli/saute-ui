

function ErrorMessage({ exception }) {
    const {message} = exception;
    console.log(message);
    return (
        <h1>
            {message}
        </h1>
    );
}

export default ErrorMessage;