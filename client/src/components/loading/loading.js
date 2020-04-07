import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
//import ReactLoading from "react-loading";
import * as legoData from "../../assets/images/legoloading.json";
import * as doneData from '../../assets/images/doneloading.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: legoData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: doneData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default class LoadingReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          done: undefined
        };
      }

      // componentDidMount() {
      //   setTimeout(() => {
      //     fetch("https://jsonplaceholder.typicode.com/posts")
      //       .then(response => response.json())
      //       .then(json => {
      //         this.setState({ loading: true });
      //         setTimeout(() => {
      //           this.setState({ done: true });
      //         }, 1000);
      //       });
      //   }, 1200);
      // }

  render() {
    return (
     <FadeIn>
  <div className="d-flex justify-content-center align-items-center">
    <h1>fetching pizza</h1>
    {!this.state.loading ? (
      <Lottie options={defaultOptions} height={320} width={320} />
    ) : (
      <Lottie options={defaultOptions2} height={320} width={320} />
    )}
  </div>
</FadeIn>
    );
  }
}
