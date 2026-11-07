import '../../assets/css/font_Inter_Looped.css';
import '../../assets/css/guide.css';

export default function GuideWebPage (){
    return (
        <div className="guide-wbp">
            <div className="gwp">
                {/* Hero  */}
                <h1 className='gw-title'>មគ្គុទ្ទេសក៍ប្រើប្រាស់ LikaWorkNote</h1>
                <blockquote>
                    <p className='gw-txt'>
                        LikaWorkNote គឺជាកម្មវិធីគ្រប់គ្រងភារកិច្ចការងារ (Task Management) ដែលជួយឱ្យអ្នកអាចរៀបចំ តាមដាន និងគ្រប់គ្រងការងារប្រចាំថ្ងៃរបស់អ្នកបានកាន់តែងាយស្រួល និងមានប្រសិទ្ធភាព។
                        តាមរយៈមគ្គុទ្ទេសក៍នេះ អ្នកនឹងស្វែងយល់ពីរបៀបបង្កើតគណនី ចូលប្រើប្រាស់កម្មវិធី កំណត់ព័ត៌មានគណនី បង្កើតប្រភេទភារកិច្ច និងគ្រប់គ្រងភារកិច្ចរបស់អ្នក។
                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_dashboard.png" alt="likaworknote - dashboard image." />
                {/* step 1 */}
                <h2 className='gw-title'>ជំហានទី១៖ បង្កើតគណនីតាមរយៈ Telegram Bot</h2>
                <blockquote>
                    <p className='gw-txt'>
                        ដើម្បីចាប់ផ្តើមប្រើប្រាស់ LikaWorkNote អ្នកត្រូវបង្កើតគណនីជាមុនសិន។ អ្នកអាចបង្កើតគណនីដោយស្វ័យប្រវត្តិតាមរយៈ Telegram Bot របស់យើង។
                    </p>
                </blockquote>
                <h2 className='gw-title'>១. ស្វែងរក Telegram Bot</h2>
                <ul className='gw-list-txt'>
                    <li>បើកកម្មវិធី Telegram នៅលើទូរស័ព្ទ ឬកុំព្យូទ័ររបស់អ្នក។</li>
                    <li>ចុចលើប្រអប់ Search ហើយវាយពាក្យ @likaworknote_bot។</li>
                    <li>ជ្រើសរើស Bot ដែលមានឈ្មោះ LikaWorkNote ហើយចូលទៅកាន់ផ្ទាំងសន្ទនា។</li>
                </ul>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_dashboard.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>២. ចាប់ផ្តើមប្រើប្រាស់ Bot</h2>
                <blockquote>
                    <p className='gw-text'>
                        ចុចលើប៊ូតុង Start ដើម្បីចាប់ផ្តើម។<br/>
                        ប្រសិនបើអ្នកមិនឃើញប៊ូតុង Start ទេ អ្នកអាចវាយពាក្យ /start នៅក្នុងប្រអប់សារ រួចចុច Send។
                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_dashboard.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>៣. រង់ចាំការបង្កើតគណនី</h2>
                <blockquote>
                    <p className='gw-text'>
                        បន្ទាប់ពីអ្នកចុច Start Bot នឹងផ្ញើសារស្វាគមន៍ និងចាប់ផ្តើមដំណើរការបង្កើតគណនីជូនអ្នក។
                    </p>
                </blockquote>
                {/* card  */}
                <div className="gwcard-sms">
                    <div className="gwcard-sms-box">
                        <img src="https://likaworknoteapi.vercel.app/assets/welcome_lika.gif" alt="likaworknote start bot image." />
                        <div className="txt">
                            <p>
                                👋 សូមស្វាគមន៍មកកាន់ LikaWorkNote!<br/>
                                សូមរង់ចាំមួយភ្លែត យើងកំពុងរៀបចំបង្កើតគណនីជូនអ្នក។
                            </p>
                        </div>
                    </div>
                </div>
                <h2 className='gw-title'>៤. ទទួលព័ត៌មានគណនី</h2>
                <blockquote>
                    <p className='gw-text'>
                        ប្រសិនបើការបង្កើតគណនីទទួលបានជោគជ័យ អ្នកនឹងទទួលបានសារដែលមានព័ត៌មានគណនីដូចខាងក្រោម៖
                    </p>
                </blockquote>
                {/* card  */}
                <div className="gwcard-sms">
                    <div className="gwcard-sms-box">
                        <img src="https://likaworknoteapi.vercel.app/assets/success_lika.gif" alt="likaworknote start bot image." />
                        <div className="txt">
                            <p>
                                🎉 សូមស្វាគមន៍មកកាន់ LikaWorkNote!<br/>
                                គណនីរបស់អ្នកត្រូវបានបង្កើតដោយជោគជ័យ។
                                <br/>
                                ឈ្មោះ៖ xxxxx<br/>
                                Username៖ xxxxxx<br/>
                                Email៖ likaworknote.userx@gmail.com<br/>
                                Temporary Password៖ xxxxxxxx<br/>
                                ថ្ងៃបង្កើត៖ xx/xx/xxxx<br/>
                                ⚠️ សូមរក្សាពាក្យសម្ងាត់នេះជាការសម្ងាត់។<br/>
                                សូមចូលទៅកាន់កម្មវិធី ហើយផ្លាស់ប្តូរពាក្យសម្ងាត់បណ្តោះអាសន្នរបស់អ្នក ដើម្បីធានាសុវត្ថិភាពគណនី។<br/>
                            </p>
                        </div>
                        <div className="f">
                            <div className="btn">Open Likaworknote</div>
                            <div className="btn">Contact support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}