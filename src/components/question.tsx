import { useState } from 'react';
import { Add } from 'iconsax-reactjs';
import '../assets/css/question.css';

export interface faqData {
  id: number;
  question: string | null;
  answer: string | null;
}

interface QuestionsLayoutProps {
  faqDatas: faqData[];
}

export function QuestionsLayout({ faqDatas }: QuestionsLayoutProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

    return(
        <section className='wqu'>
            <div className="wqu-box">
                <div className="wqu-c">
                    <ul className="wquc-box">
                        {faqDatas.map((item) => {
                            const isActive = openId === item.id;

                            return (
                                <li 
                                    key={item.id} 
                                    className={isActive ? 'active' : ''}
                                >
                                    <div className='qul-h' onClick={() => toggleFaq(item.id)} style={{ cursor: 'pointer' }}>
                                        <div className="qulh-box df-s">
                                            <h3>{item.question}</h3>
                                            <div className='icon icon-ra icon-sm'>
                                                <Add style={{ transform: isActive ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='qul-c'>
                                        <blockquote className='qulc-box'>
                                            <p>{item.answer}</p>
                                        </blockquote>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}