import { QuestionsLayout, type faqData } from '../../components/question';

import '../../assets/css/font_Inter_Looped.css';
import '../../assets/css/guide.css';

export default function GuideWebPage (){
    const questionList: faqData[] = [
        {
            id: 1,
            question: "១. តើខ្ញុំត្រូវបង្កើតគណនីម្តងទៀតដែរឬទេ នៅពេលបិទកម្មវិធី?",
            answer: "មិនចាំបាច់ទេ។ គណនីរបស់អ្នកត្រូវបានបង្កើតរួចហើយ។ អ្នកអាចបើកកម្មវិធីម្តងទៀតតាមរយៈ Telegram Bot ហើយចូលប្រើប្រាស់ដោយប្រើគណនីដដែល។"
        },
        {
            id: 2,
            question: "២. តើខ្ញុំត្រូវធ្វើដូចម្តេច ប្រសិនបើមិនអាចបង្កើតគណនីបាន?",
            answer: 'សូមព្យាយាមចុច /start ម្តងទៀត។ ប្រសិនបើនៅតែមិនអាចបង្កើតគណនីបាន សូមទាក់ទងក្រុម Support របស់ LikaWorkNote។'
        },
        {
            id: 3,
            question: "៣. តើខ្ញុំត្រូវធ្វើដូចម្តេច ប្រសិនបើភ្លេចពាក្យសម្ងាត់?",
            answer: 'សូមទាក់ទងក្រុម Support ដើម្បីទទួលបានការណែនាំ និងជំនួយក្នុងការដោះស្រាយបញ្ហាគណនីរបស់អ្នក។'
        },
        {
            id: 4,
            question: "៤. តើខ្ញុំអាចប្រើប្រាស់ LikaWorkNote នៅលើឧបករណ៍ផ្សេងបានដែរឬទេ?",
            answer: 'អ្នកអាចបើកគេហទំព័រ LikaWorkNote តាមរយៈកម្មវិធីរុករកអ៊ីនធឺណិត (Browser) និងចូលប្រើប្រាស់ដោយប្រើគណនីរបស់អ្នក។'
        }
    ];
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
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_app.png" alt="likaworknote - dashboard image." />
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
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_search.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>២. ចាប់ផ្តើមប្រើប្រាស់ Bot</h2>
                <blockquote>
                    <p className='gw-text'>
                        ចុចលើប៊ូតុង Start ដើម្បីចាប់ផ្តើម។<br/>
                        ប្រសិនបើអ្នកមិនឃើញប៊ូតុង Start ទេ អ្នកអាចវាយពាក្យ /start នៅក្នុងប្រអប់សារ រួចចុច Send។
                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_start.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>៣. រង់ចាំការបង្កើតគណនី</h2>
                <blockquote>
                    <p className='gw-text'>
                        បន្ទាប់ពីអ្នកចុច Start Bot នឹងផ្ញើសារស្វាគមន៍ និងចាប់ផ្តើមដំណើរការបង្កើតគណនីជូនអ្នក។
                    </p>
                </blockquote>
                {/* card  */}
                <div className="gwcard-09">
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
                </div>
                <h2 className='gw-title'>៤. ទទួលព័ត៌មានគណនី</h2>
                <blockquote>
                    <p className='gw-text'>
                        ប្រសិនបើការបង្កើតគណនីទទួលបានជោគជ័យ អ្នកនឹងទទួលបានសារដែលមានព័ត៌មានគណនីដូចខាងក្រោម៖
                    </p>
                </blockquote>
                {/* card  */}
                <div className="gwcard-09">
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
                        </div>
                        <div className="f f2">
                            <div className="btn">Open Likaworknote</div>
                            <div className="btn">Contact support</div>
                        </div>
                    </div>
                </div>
                <h2 className='gw-title'>៥. បើកកម្មវិធី LikaWorkNote</h2>
                <blockquote>
                    <p className='gw-text'>
                        នៅក្នុងសារដែល Bot បានផ្ញើមក អ្នកអាចចុចលើប៊ូតុង Open LikaWorkNote ដើម្បីបើកកម្មវិធី។
                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_open.png" alt="likaworknote - dashboard image." />
                <blockquote>
                    <p className='gw-text'>
                        ប្រសិនបើការបង្កើតគណនីមិនបានជោគជ័យ Bot នឹងផ្ញើសារជូនដំណឹងដូចខាងក្រោម៖
                    </p>
                </blockquote>
                {/* card  */}
                <div className="gwcard-09">
                    <div className="gwcard-sms">
                        <div className="gwcard-sms-box">
                            <img src="https://likaworknoteapi.vercel.app/assets/sorry_lika.gif" alt="likaworknote start bot image." />
                            <div className="txt">
                                <p>
                                    LikaWorkNote សូមអភ័យទោស! 🙏
                                    <br/>
                                    យើងមិនអាចបង្កើតគណនីជូនអ្នកបានទេ។
                                    សូមចុច /start ដើម្បីព្យាយាមម្ដងទៀត។
                                    <br/>
                                    បើបញ្ហានៅតែបន្ត សូមទាក់ទង Support។
                                </p>
                            </div>
                        </div>
                        <div className="f f2">
                            <div className="btn">Contact support</div>
                        </div>
                    </div>
                </div>
                <h2 className='gw-title'>ជំហានទី២៖ ចូលគណនី និងកំណត់ព័ត៌មានផ្ទាល់ខ្លួន</h2>
                <blockquote>
                    <p className='gw-text'>
                       បន្ទាប់ពីទទួលបានព័ត៌មានគណនី អ្នកអាចចាប់ផ្តើមចូលប្រើប្រាស់ LikaWorkNote បាន។
                    </p>
                </blockquote>
                <h2 className='gw-title'>១. ចូលគណនី</h2>
                <blockquote>
                    <p className='gw-text'>
                       បើកកម្មវិធី LikaWorkNote ហើយបំពេញព័ត៌មានដូចខាងក្រោម៖
                    </p>
                </blockquote>
                <ul className='gw-list-txt'>
                    <li>Email៖ បញ្ចូលអាសយដ្ឋានអ៊ីមែលដែល Bot បានបង្កើតជូនអ្នក។</li>
                    <li>Password៖ បញ្ចូលពាក្យសម្ងាត់បណ្តោះអាសន្នដែលអ្នកបានទទួលតាម Telegram។</li>
                </ul>
                <blockquote>
                    <p className='gw-text'>
                       បន្ទាប់មកចុចប៊ូតុង ចូលគណនី ។
                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_login.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>២. ស្គាល់ផ្ទាំងគ្រប់គ្រង</h2>
                <blockquote>
                    <p className='gw-text'>
                        នៅពេលចូលគណនីបានជោគជ័យ អ្នកនឹងត្រូវបាននាំទៅកាន់ផ្ទាំង Dashboard។<br/>
                        Dashboard គឺជាផ្ទាំងសង្ខេបព័ត៌មានការងាររបស់អ្នក ដែលជួយឱ្យអ្នកមើលឃើញទិដ្ឋភាពទូទៅនៃភារកិច្ច និងរបាយការណ៍ការងាររបស់អ្នក។

                    </p>
                </blockquote>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_dashboard.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>៣. ផ្លាស់ប្តូរពាក្យសម្ងាត់</h2>
                <blockquote>
                    <p className='gw-text'>
                       ដើម្បីការពារសុវត្ថិភាពគណនី សូមផ្លាស់ប្តូរពាក្យសម្ងាត់បណ្តោះអាសន្ន បន្ទាប់ពីចូលប្រើប្រាស់លើកដំបូង។<br/>
                        អនុវត្តតាមជំហានខាងក្រោម៖
                    </p>
                </blockquote>
                <ul className='gw-list-txt'>
                    <li>ចុចលើប៊ូតុង Menu។</li>
                    <li>ជ្រើសរើស ការកំណត់។</li>
                    <li>ចូលទៅកាន់ផ្នែក កែប្រែគណនី។</li>
                    <li>បំពេញព័ត៌មានដែលអ្នកចង់កែប្រែ និងកំណត់ពាក្យសម្ងាត់ថ្មី។</li>
                    <li>រក្សាទុកការផ្លាស់ប្តូរ។</li>
                </ul>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_password.png" alt="likaworknote - dashboard image." />
                <blockquote>
                    <p className='gw-text'>
                        <strong style={{fontWeight: '600'}}>ចំណាំ៖</strong> សូមប្រើពាក្យសម្ងាត់ដែលមានសុវត្ថិភាព និងកុំចែករំលែកព័ត៌មានចូលគណនីរបស់អ្នកទៅកាន់អ្នកដទៃ។
                    </p>
                </blockquote>
                <h2 className='gw-title'>ជំហានទី៣៖ បង្កើតប្រភេទភារកិច្ច </h2>
                <blockquote>
                    <p className='gw-text'>
                        មុនពេលបង្កើតភារកិច្ច អ្នកគួរបង្កើតប្រភេទភារកិច្ចជាមុនសិន ដើម្បីងាយស្រួលក្នុងការបែងចែក និងគ្រប់គ្រងការងារតាមប្រភេទនីមួយៗ។<br/>
                        ឧទាហរណ៍៖
                    </p>
                </blockquote>
                <ul className='gw-list-txt'>
                    <li>ការងារក្រុមហ៊ុន (Company Work)</li>
                    <li>ការងារផ្ទាល់ខ្លួន (Personal Work)</li>
                    <li>ការងារអភិវឌ្ឍន៍គម្រោង (Project Development)</li>
                    <li>ការសិក្សា (Learning)</li>
                </ul>
                <h2 className='gw-title'>របៀបបង្កើតប្រភេទភារកិច្ច៖</h2>
                <div style={{paddingLeft: '0rem'}} className='gw-list-txt'>
                    <div>1.	ចូលទៅកាន់ Menu។</div>
                    <div>2.	ជ្រើសរើស ប្រភេទភារកិច្ច (Task Categories)។</div>
                    <div>3.	ចុចប៊ូតុង បន្ថែមប្រភេទ (Add Category)។</div>
                    <div>4.	បំពេញព័ត៌មានប្រភេទភារកិច្ច៖</div>
                    <ul className='gw-list-txt'>
                        <li><strong style={{fontWeight: '600'}}>ចំណងជើង (Title)៖</strong> ឈ្មោះប្រភេទភារកិច្ច។</li>
                        <li><strong style={{fontWeight: '600'}}>ការពិពណ៌នា (Description)៖</strong> ព័ត៌មានបន្ថែមអំពីប្រភេទភារកិច្ច (អាចទុកទទេបាន ប្រសិនបើមិនចាំបាច់)។</li>
                    </ul>
                    <div>5.	ចុចប៊ូតុងរក្សាទុក ដើម្បីបង្កើតប្រភេទថ្មី។</div>
                </div>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_type.png" alt="likaworknote - dashboard image." />
                <blockquote>
                    <p className='gw-text'>
                        <strong style={{fontWeight: '600'}}>គន្លឹះ៖</strong>អ្នកគួររៀបចំប្រភេទភារកិច្ចឱ្យស្របទៅតាមលក្ខណៈការងាររបស់អ្នក ដើម្បីងាយស្រួលស្វែងរក និងតាមដាននៅពេលក្រោយ។
                    </p>
                </blockquote>
                <h2 className='gw-title'>ជំហានទី៤៖ បង្កើត និងគ្រប់គ្រងភារកិច្ច (Tasks) </h2>
                <blockquote>
                    <p className='gw-text'>
                        បន្ទាប់ពីបង្កើតប្រភេទភារកិច្ចរួច អ្នកអាចចាប់ផ្តើមបង្កើតភារកិច្ចដែលត្រូវធ្វើប្រចាំថ្ងៃ ឬការងារសម្រាប់គម្រោងផ្សេងៗបាន។
                    </p>
                </blockquote>
                <h2 className='gw-title'>១. ចូលទៅកាន់ផ្ទាំងភារកិច្ច</h2>
                <ul className='gw-list-txt'>
                    <li>ចុចលើ Menu។</li>
                    <li>ជ្រើសរើស ភារកិច្ច។</li>
                    <li>ចុចប៊ូតុង បន្ថែមភារកិច្ច។</li>
                </ul>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_task.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>២. បំពេញព័ត៌មានភារកិច្ច</h2>
                <blockquote>
                    <p className='gw-text'>
                        នៅក្នុងផ្ទាំងបន្ថែមភារកិច្ច អ្នកត្រូវបំពេញព័ត៌មានដូចខាងក្រោម៖
                    </p>
                </blockquote>
                <blockquote>
                    <p className='gw-text'>
                        <strong style={{fontWeight: '600'}}>ចំណងជើង </strong>
                        បញ្ចូលឈ្មោះការងារដែលអ្នកត្រូវធ្វើ។ ឧទាហរណ៍៖ រៀបចំរបាយការណ៍ប្រចាំខែ។<br/>
                        <span>ចំណាំ៖ តម្រូវឱ្យបំពេញ។</span><br/>
                        <strong style={{fontWeight: '600'}}>ការពិពណ៌នា </strong><br/>
                        បញ្ចូលព័ត៌មានលម្អិតបន្ថែមអំពីការងារ ដើម្បីជួយឱ្យអ្នកចងចាំពីអ្វីដែលត្រូវធ្វើ។
                        ឧទាហរណ៍៖ ប្រមូលទិន្នន័យលក់ និងរៀបចំរបាយការណ៍សម្រាប់ខែនេះ។<br/>
                        <span>ចំណាំ៖ មិនចាំបាច់បំពេញ ប្រសិនបើមិនមានព័ត៌មានបន្ថែម។</span><br/>
                        <strong style={{fontWeight: '600'}}>ស្ថានភាពការងារ </strong><br/>
                        ជ្រើសរើសស្ថានភាពបច្ចុប្បន្នរបស់ការងារ ដើម្បីបង្ហាញថាការងារនោះកំពុងស្ថិតក្នុងដំណាក់កាលណា។
                        សូមជ្រើសរើសស្ថានភាពដែលសមស្របទៅនឹងការងាររបស់អ្នក។<br/>
                        <span>ចំណាំ៖ តម្រូវឱ្យជ្រើសរើស។</span><br/>
                        <strong style={{fontWeight: '600'}}>ប្រភេទភារកិច្ច </strong><br/>
                        ជ្រើសរើសប្រភេទភារកិច្ចដែលអ្នកបានបង្កើតនៅជំហានទី៣ ដើម្បីចាត់ថ្នាក់ការងាររបស់អ្នក។<br/>
                        <span>ចំណាំ៖ តម្រូវឱ្យជ្រើសរើស។</span><br/>
                        <strong style={{fontWeight: '600'}}>ថ្ងៃផុតកំណត់ </strong><br/>
                        ជ្រើសរើសកាលបរិច្ឆេទដែលអ្នកចង់បញ្ចប់ការងារនោះ។ វាជួយឱ្យអ្នករៀបចំផែនការ និងគ្រប់គ្រងពេលវេលាបានកាន់តែប្រសើរ។<br/>
                        <span> ចំណាំ៖ តម្រូវឱ្យបំពេញ។</span><br/>
                        <strong style={{fontWeight: '600'}}>ភាគរយនៃការងារ </strong><br/>
                        បញ្ចូលភាគរយនៃការងារដែលអ្នកបានបញ្ចប់រួចរាល់ ដើម្បីតាមដានវឌ្ឍនភាពនៃការងារនោះ។<br/>
                        ឧទាហរណ៍៖
                    </p>
                    <ul className='gw-list-txt'>
                        <li>0%៖ មិនទាន់ចាប់ផ្តើមការងារ។</li>
                        <li>25%៖ បានបញ្ចប់ការងារមួយផ្នែក។</li>
                        <li>50%៖ បានបញ្ចប់ការងារពាក់កណ្តាល។</li>
                        <li>75%៖ កំពុងស្ថិតក្នុងដំណាក់កាលចុងក្រោយ។</li>
                        <li>100%៖ បានបញ្ចប់ការងារទាំងស្រុង។</li>
                    </ul>
                </blockquote>
                <blockquote>
                    <p className='gw-text'>
                        <strong style={{fontWeight: '600'}}>ចំណាំ៖</strong>អាចបំពេញតាមវឌ្ឍនភាពការងារជាក់ស្តែងរបស់អ្នក។
                    </p>
                </blockquote>
                <h2 className='gw-title'>៣. រក្សាទុកភារកិច្ច</h2>
                <blockquote>
                    <p className='gw-text'>
                        បន្ទាប់ពីបំពេញព័ត៌មានរួចរាល់ សូមពិនិត្យមើលព័ត៌មានម្តងទៀត រួចចុចប៊ូតុង រក្សាទុក (Save) ដើម្បីបង្កើតភារកិច្ចថ្មី។
                    </p>
                </blockquote>
                <blockquote>
                    <p className='gw-text'>
                        ភារកិច្ចរបស់អ្នកនឹងត្រូវបានបង្ហាញនៅក្នុងបញ្ជីភារកិច្ច។
                    </p>
                </blockquote>
                <h2 className='gw-title'>ជំហានទី៥៖ ប្រើប្រាស់ និងបន្តគ្រប់គ្រងការងារ</h2>
                <blockquote>
                    <p className='gw-text'>
                        នៅពេលដែលអ្នកបានបង្កើតភារកិច្ចរួច អ្នកអាចបន្តប្រើប្រាស់កម្មវិធី ដើម្បីតាមដានការងាររបស់អ្នក។
                        សូមប្រើប្រាស់ផ្ទាំងភារកិច្ច និង Dashboard ដើម្បីពិនិត្យមើលព័ត៌មានការងាររបស់អ្នក។
                        នៅពេលដែលវឌ្ឍនភាពការងារផ្លាស់ប្តូរ អ្នកអាចចូលទៅកែប្រែព័ត៌មានភារកិច្ច ដើម្បីធ្វើបច្ចុប្បន្នភាពឱ្យស្របទៅនឹងស្ថានភាពការងារជាក់ស្តែង។
                        ការធ្វើបច្ចុប្បន្នភាពព័ត៌មានជាប្រចាំ នឹងជួយឱ្យអ្នកមិនភ្លេចការងារសំខាន់ៗ និងងាយស្រួលវាយតម្លៃលទ្ធផលការងាររបស់ខ្លួន។
                    </p>
                </blockquote>
                <h2 className='gw-title'>ជំហានទី៦៖ បើកកម្មវិធីម្តងទៀតតាមរយៈ Telegram</h2>
                <blockquote>
                    <p className='gw-text'>
                        អ្នកមិនចាំបាច់បង្កើតគណនីម្តងទៀតរាល់ពេលដែលអ្នកចង់ប្រើប្រាស់ LikaWorkNote នោះទេ។
                        បន្ទាប់ពីប្រើប្រាស់រួច អ្នកអាចបិទកម្មវិធីបានដោយសុវត្ថិភាព។<br/>
                        នៅពេលដែលអ្នកចង់ប្រើប្រាស់ម្តងទៀត៖
                    </p>
                </blockquote>
                <div style={{paddingLeft: '0rem'}} className='gw-list-txt'>
                    <div>1.	បើក Telegram។</div>
                    <div>2.	ចូលទៅកាន់ការសន្ទនាជាមួយ @likaworknote_bot។</div>
                    <div>3.	ចុចលើប៊ូតុង Open App ដែលស្ថិតនៅក្បែរប្រអប់វាយសារ។</div>
                    <div>4.	កម្មវិធី LikaWorkNote នឹងបើកឡើងវិញ។</div>
                    <div>5.	ប្រសិនបើកម្មវិធីតម្រូវឱ្យចូលគណនី សូមបញ្ចូល Email និង Password របស់អ្នក។</div>
                </div>
                <img className='img-c asp16x9 lika-dashboard-img' src="/likaworknote_openApp.png" alt="likaworknote - dashboard image." />
                <h2 className='gw-title'>សំណួរដែលសួរញឹកញាប់ (Frequently Asked Questions)</h2>
                <QuestionsLayout faqDatas={questionList} />
                <h2 className='gw-title'>ត្រូវការជំនួយបន្ថែមមែនទេ?</h2>
                <blockquote>
                    <p className='gw-text'>
                        យើងយល់ថា ការចាប់ផ្តើមប្រើប្រាស់កម្មវិធីថ្មីអាចមានចំណុចមួយចំនួនដែលអ្នកមិនទាន់យល់ច្បាស់។
                        ប្រសិនបើអ្នកជួបប្រទះបញ្ហាក្នុងការបង្កើតគណនី ការចូលប្រើប្រាស់ ឬការគ្រប់គ្រងភារកិច្ច សូមកុំស្ទាក់ស្ទើរក្នុងការទាក់ទងមកកាន់ក្រុមការងារ LikaWorkNote។
                        មតិយោបល់ សំណើកែលម្អ និងការរាយការណ៍បញ្ហារបស់អ្នក គឺជាចំណែកដ៏សំខាន់ក្នុងការជួយឱ្យយើងអភិវឌ្ឍ LikaWorkNote ឱ្យកាន់តែប្រសើរឡើង។
                    </p>
                </blockquote>
                <blockquote>
                    <p className='gw-text' style={{textAlign: 'center'}}>
                        សូមអរគុណដែលបានជ្រើសរើសប្រើប្រាស់ LikaWorkNote!
                    </p>
                </blockquote>
            </div>
        </div>
    );
}