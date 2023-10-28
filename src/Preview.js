
function Preview() {
  return (
    <>
        <title>Discord Streamkit Overlay Tester</title>
        <div id="root">
            <div className="Voice_voiceContainer__adk9M">
            <ul className="Voice_voiceStates__a121W">
                <li className="Voice_voiceState__OCoZh">
                <img
                    className="Voice_avatar__htiqH"
                    src="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
                    alt=""
                />
                <div className="Voice_user__8fGwX">
                    <span className="Voice_name__TALd9">だんまり</span>
                </div>
                </li>
                <li className="Voice_voiceState__OCoZh">
                <img
                    className="Voice_avatar__htiqH Voice_avatarSpeaking__lE+4m"
                    src="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
                    alt=""
                />
                <div className="Voice_user__8fGwX">
                    <span className="Voice_name__TALd9">しゃべり</span>
                </div>
                </li>
                <li className="Voice_voiceState__OCoZh">
                <img
                    className="Voice_avatar__htiqH speakTest01"
                    src="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
                    alt=""
                />
                <div className="Voice_user__8fGwX">
                    <span className="Voice_name__TALd9">ダミー01</span>
                </div>
                </li>
                <li className="Voice_voiceState__OCoZh">
                <img
                    className="Voice_avatar__htiqH speakTest02"
                    src="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
                    alt=""
                />
                <div className="Voice_user__8fGwX">
                    <span className="Voice_name__TALd9">ダミー02</span>
                </div>
                </li>
                <li className="Voice_voiceState__OCoZh">
                <img
                    className="Voice_avatar__htiqH speakTest03"
                    src="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png"
                    alt=""
                />
                <div className="Voice_user__8fGwX">
                    <span className="Voice_name__TALd9">ダミー03</span>
                </div>
                </li>
            </ul>
            </div>
        </div>
        <style
            dangerouslySetInnerHTML={{
            __html:
                "\n  :root {\n    --brand: #5865f2;\n    --brand-dark: #4957f1;\n    --grey-1: #99aab5;\n    --grey-3: #737f8d;\n    --grey-6: #4f545c;\n    --guilds-grey: #1e2124;\n    --status-grey: #604f56;\n    --status-green: #3ba53b;\n  }\n  .Voice_name__TALd9{\n    color: rgb(255, 255, 255);\n    font-size: 14px;\n    background-color: rgba(30, 33, 36, 0.95);\n  }\n  .Voice_voiceContainer__adk9M {\n    color: #fff;\n    font-family: gg sans;\n    font-size: 16px;\n    font-weight: 600;\n    line-height: 19px;\n  }\n  .Voice_voiceStates__a121W {\n    list-style-type: none;\n    padding-left: 15px;\n  }\n  ul {\n    display: block;\n    list-style-type: disc;\n    margin-block-start: 1em;\n    margin-block-end: 1em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    padding-inline-start: 40px;\n  }\n  .Voice_voiceState__OCoZh {\n    height: 50px;\n    margin-bottom: 8px;\n  }\n  li {\n    display: list-item;\n    text-align: -webkit-match-parent;\n  }\n  .Voice_avatar__htiqH {\n    border: 3px solid transparent;\n    border-radius: 50%;\n    float: left;\n    height: 50px;\n    margin-right: 8px;\n    width: 50px;\n  }\n  img .Voice_avatar__htiqH {\n    overflow-clip-margin: content-box;\n    overflow: clip;\n  }\n  .Voice_user__8fGwX {\n    padding-top: 18px;\n  }\n  .Voice_name__TALd9 {\n    background-color: var(--guilds-grey);\n    border-radius: 3px;\n    padding: 4px 6px;\n  }\n  .Voice_avatarSpeaking__lE\\+4m {\n    border-color: var(--status-green);\n  }\n"
            }}
        />
    </>
  );
}

export default Preview;
