export default function WebLoader({ children = 'រង់ចាំបន្ដិចយើងកំពុងដំណើរការ!' }) {
    return (
        <div className="web-loaded">
            <div className="webloaded-box">
                <div className="webloaded-con df-c">
                    <div className="webloadedani"></div>
                    <p>{children}</p>
                    <div className="webloadedani-right"></div>
                </div>
            </div>
        </div>
    );
}