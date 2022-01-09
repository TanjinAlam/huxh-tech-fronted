import React from "react";
import { Image } from 'antd';
import axios from "./authAxios";

class ImageWithStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageStatus: "loading", };
    }

    handleImageLoadStart() {
        this.setState({ imageStatus: "loaded" });
        this.setState({ imageUrl: "/assets/img/200.gif" })
    }

    handleImageLoaded() {
        this.setState({ imageStatus: "loaded" });
    }

    handleImageErrored() {
        this.setState({ imageStatus: "failed to load" });
    }

    componentDidMount() {

        this.handleImageLoadStart()
        axios.get("file/" + this.props.url, { responseType: "arraybuffer" })
            .then(response => {
                let image = btoa(
                    new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                let src = "data:image;base64, " + image;
                this.setState({ imageUrl: src })
                this.handleImageLoaded()
            })
            .catch(err => {
                this.handleImageErrored()
                return err
            })
    }

    render() {
        return (
            <div>
                <Image
                    alt="loaded resource"
                    width={200}
                    src={this.state.imageUrl}
                    width={80}
                    height={80}
                />
                {/* <img
                    alt="loaded resource"
                    src={this.state.imageUrl}
                    onLoadStart={this.handleImageLoadStart.bind(this)}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                    width={80}
                    height={80}
                /> */}
            </div>
        );
    }
}
export default ImageWithStatus;