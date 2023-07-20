// ${styles.button}

function CloseButton({onClose, className}) {
    const classes = `${className}`;
    return (
        <button className={classes} onClick={onClose}>
           Close
        </button>
    );
}

export default CloseButton;