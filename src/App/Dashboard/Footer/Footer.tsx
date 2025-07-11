import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center py-8 text-gray-500"
        >
            <p className="text-sm">
                Individual data retrieved on refresh • Last updated:{" "}
                {new Date().toLocaleTimeString()}
            </p>
        </motion.footer>
    );
};
