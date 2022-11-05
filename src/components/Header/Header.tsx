import { FaAmazon } from 'react-icons/fa';
import LinkTextIcon from '../LinkTextIcon/LinkTextIcon';

const Header = () => {
    
    return (
      //TODO - check react query!!!
      //TODO - check react redux state management
      <div className="c-header">
          <LinkTextIcon 
            link="/contactUs"
            textId="header.contactUs"
            defaultText="Contact Us"
            icon={FaAmazon}
          />
      </div>
    );
};
  
export default Header;