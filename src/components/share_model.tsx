
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
    FaTimes,
    FaFacebookF,
    FaTelegramPlane,
    FaLinkedinIn,
    FaWhatsapp,
    FaLink,
} from "react-icons/fa";
import "../assets/css/sharemodel.css";

interface ShareModalProps {
    isOpen: boolean;
    url: string;
    onClose: () => void;
    title?: string;
}

export default function ShareModal({
    isOpen,
    url,
    onClose,
    title = "Share",
}: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setCopied(false);
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const encodedUrl = encodeURIComponent(url);

    const socialLinks = [
        {
            name: "Facebook",
            icon: <FaFacebookF />,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: "Telegram",
            icon: <FaTelegramPlane />,
            href: `https://t.me/share/url?url=${encodedUrl}`,
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
            name: "WhatsApp",
            icon: <FaWhatsapp />,
            href: `https://wa.me/?text=${encodedUrl}`,
        },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
        } catch {
            // Fallback for browsers where Clipboard API is unavailable.
            const input = document.createElement("textarea");
            input.value = url;
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.appendChild(input);
            input.select();

            const success = document.execCommand("copy");
            document.body.removeChild(input);

            setCopied(success);
        }
    };

    return (
        <div
            className="share-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="share-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-modal-title"
            >
                <button
                    type="button"
                    className="share-close"
                    onClick={onClose}
                    aria-label="Close share dialog"
                >
                    <FaTimes />
                </button>

                <h3 id="share-modal-title">{title}</h3>

                <div className="share-qr">
                    <QRCodeSVG value={url} size={160} />
                </div>

                <div className="share-socials">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Share via ${social.name}`}
                        >
                            {social.icon}
                            <span>{social.name}</span>
                        </a>
                    ))}
                </div>

                <div className="share-copy">
                    <div className="share-url">
                        <FaLink />
                        <input
                            aria-label="Share URL"
                            value={url}
                            readOnly
                            onFocus={(event) => event.target.select()}
                        />
                    </div>

                    <button
                        type="button"
                        className={`share-copy-btn ${
                            copied ? "is-copied" : ""
                        }`}
                        onClick={copyLink}
                    >
                        {copied ? "Copied!" : "Copy link"}
                    </button>
                </div>
            </div>
        </div>
    );
}
