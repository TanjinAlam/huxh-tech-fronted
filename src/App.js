import React from "react"
import Layout from './apps/pages/layouts/index'
import LoadingOverlay from 'react-loading-overlay'
import LoadingImage from './apps/helpers/Confirm/LoadingImage'
export const LoadingContext = React.createContext(false)

function App() {

    const [loading, setLoading] = React.useState(false)
    const [loadingText, setLoadingText] = React.useState('')

    function loadingState(flag) {
        console.log("typeof(flag)", typeof (flag));

        if (typeof (flag) == "object") {
            setLoading(flag.loading)
            setLoadingText(flag.text)
        } else {
            setLoading(flag)
        }
        // if (flag) {
        //     setLoading(true)
        // } else {
        //     setLoading(false)
        // }
    }

    function loadingTextState(text) {
        setLoadingText(text)
    }

    return (
        <>
            <LoadingContext.Provider value={{ loading, loadingState }}>
                <LoadingOverlay active={loading} spinner={<LoadingImage />} text={loadingText}>
                    <Layout />
                </LoadingOverlay>
            </LoadingContext.Provider>
        </>
    );
}

export default App;