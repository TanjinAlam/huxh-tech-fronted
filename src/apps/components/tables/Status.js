export const Status = ({flag}) => {
    return(
        <>
            <span className={`custom-badge ${(flag==1)?'status-green':'status-red'}`}>
                {(flag==1)?'Active':'In-active'}
            </span>
        </>
    );
}