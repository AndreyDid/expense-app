import React from "react";

const Footer = () => {
    return (
        <div className="p-2 mt-4 border-top position-sticky top-100 navbar-light bg-light">
            <div className="d-flex justify-content-center align-items-center">
                <div className="flex-column justify-content-center">
                    <p className="mb-2 text-secondary">© 2023 Андрей Диденко</p>
                    <div className="d-flex justify-content-center">
                        <a
                            href="https://github.com/AndreyDid/expense-app"
                            title="Проект на GitHub"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-decoration-none d-flex text-secondary"
                        >
                            <i className="bi bi-github me-2"></i>
                            <span>Исходный код</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
