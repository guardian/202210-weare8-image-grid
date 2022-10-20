import { Component, render, h, Fragment } from "preact";
// import { TwitterShare, FacebookShare, EmailShare, LinkedinShare, PinterestShare } from "preact-social";
import {EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";

let shareUrl=null, title=null, iconSize=44;
export default class SocialShare extends Component {
    constructor(props){
        super(props);
        shareUrl = this.props.url;
        iconSize = this.props.iconSize || iconSize;
        console.log('SocialBar mount', shareUrl);
        title = this.props.title || '';

    }     
  componentDidMount() {}

  render(props, { results = [] }) {

    return (
        <div className="social-share">
        <FacebookShareButton url={props.url} >
            <FacebookIcon round={true} size={iconSize} />
        </FacebookShareButton>

        <TwitterShareButton url={props.url} title={props.title}>
            <TwitterIcon round={true} size={iconSize} />
        </TwitterShareButton>

        <EmailShareButton url={props.url} title={props.title}>
            <EmailIcon round={true} size={iconSize} />
        </EmailShareButton>
        </div>
    )
  }
}
