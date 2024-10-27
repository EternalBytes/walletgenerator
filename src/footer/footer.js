import React from "react";
import './footer.scss';

export default function Footer(){
    return (
        <div className="footer-container">
            <dir className="footer-container--donations">
                <p className="donations"><span>Donations: </span><a href="https://cashtab.com/#/send?bip21=ecash:qpfjy2xjy0ateekudl4yehgg3uyl2njdkc8qwae4zj?op_return_raw=040074616208205468616e6b7320" target="_blank" rel="noreferrer">ecash:qpfjy2xjy0ateekudl4yehgg3uyl2njdkc8qwae4zj</a></p>
                <p className="copy">Copyright eternalbytes.github.io. No warranty.</p>
            </dir>
        </div>
    )
}