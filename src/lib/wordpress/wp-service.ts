import WpClient from "./wp-client";
 
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_PASSWORD = process.env.WORDPRESS_PASSWORD;
 
const wpService = new WpClient(WORDPRESS_USERNAME!, WORDPRESS_PASSWORD!);
 
export default wpService;
