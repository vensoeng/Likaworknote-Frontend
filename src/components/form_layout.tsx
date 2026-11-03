
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";
import webIcon from '/favicon_uw.png';
import { 
    Add,
    Magicpen,
    HomeHashtag,
    MainComponent,
    BrifecaseTimer
} from 'iconsax-reactjs';

interface FormLayoutProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  formId?: string;
  submitting?: boolean;
}

export default function FormLayout({
  title,
  children,
  onClose,
  formId,
  submitting = false,
}: FormLayoutProps) {

    const {user, getProfileImage} = useAuth();
  return (
        <div className="wbfm active">
            <div className="wbfm-bx">
                {/* Header */}
                <div className="wbfmh">
                    <div className="wbfmh-bx df-s">
                        <div className="pf icon icon-ra icon-sm">
                            <img src={webIcon} className='img-c' alt="website icon!" />
                        </div>
                        <h3>{title}</h3>
                        <div className="btn-close icon icon-ra icon-sm"
                        onClick={onClose}>
                            <Add />
                        </div>
                    </div>
                </div>
                {/* User profile info */}
                <div className="wbfmpr">
                    <div className="wbfmpr-bx df-s">
                        <div className="pr-bx df-l">
                            <div className="pr icon icon-ra">
                                <img 
                                    className='img-c' 
                                    src={getProfileImage(user?.pr_img)} 
                                    alt="user profile" 
                                />
                            </div>
                            <div className="txt">
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p>{user?.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* this is content */}
                {children}
                {/* this is footer  */}
                <div className="wbfmft">
                    <div className="wbfmft-box df-c">
                        <div className="wbfmft-action df-s">
                            <div className="txt">
                                <h2>ការបង្កើតផ្សេងៗ</h2>
                            </div>
                            <ul className='df-c btn-list-action'>
                                <li>
                                    <a href="/user/dashboard" className="btn">
                                        <HomeHashtag />
                                    </a>
                                </li>
                                <li>
                                    <a href="/tasks" className="btn">
                                        <Magicpen />
                                    </a>
                                </li>
                                <li>
                                    <a href="/type/tasks" className="btn">
                                        <MainComponent />
                                    </a>
                                </li>
                                <li>
                                    <a href="/category/tasks" className="btn">
                                        <BrifecaseTimer />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-sub">
                            <button
                                type="submit"
                                form={formId}
                                className="btn"
                                disabled={submitting}
                            >
                                {submitting ? "កំពុងរក្សាទុក..." : "រក្សារទុក"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* this is ovelay of form  */}
            <div className="wbfm-overlay"></div>
        </div>
    );
}
