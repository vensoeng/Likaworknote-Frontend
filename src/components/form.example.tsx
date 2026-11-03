// import { FormHeader, FormTablink } from "./form_components";
export default  function FormModel(){
    return(
        <div className="wbfm">
            <div className="wbfm-bx">
                {/* <FormHeader/> */}
                {/* this is status  */}
                <div className="wbfmta">
                    <div className="wbfmta-bx btn">
                        <select name="status" id="form-status-select" disabled>
                            <option value="true">សាធារណៈ</option>
                            <option value="false">ឯកជនភាព</option>
                        </select>
                    </div>
                </div>
                {/* this is form content  */}
                <div className="wbfmcn scroll-y">
                    <div className="wbfmcn-bx">
                        {/* this is input style for text number email  */}
                        <div className="txt-in">
                            <div className="txtin-bx">
                                <label htmlFor="txt-title">ចំណងជើង</label>
                                <div className="txtin-bx">
                                    <input type="text" className="txt-title" id="txt-title" placeholder='សូមបញ្ចូលចំណងជើង' />
                                </div>
                            </div>
                        </div>
                        {/* this is description  */}
                        <div className="txt-caption txtin-bx">
                            <label htmlFor="desc">ការពិពណ៌នា</label>
                            <div className="txt-caption-box">
                                <textarea name="des" id="des" cols={30} rows={1} placeholder="សរសេរការពិពណ៌នា"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                {/* this is footer  */}
                <div className="wbfmft">
                    <div className="wbfmft-box df-c">
                        {/* <FormTablink/> */}
                        <div className="btn-sub">
                            <div className="btn">រក្សារទុក</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is ovelay of form  */}
            <div className="wbfm-overlay"></div>
        </div>
    );
}