import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUser } from '../../types/api/dymMyApi';
import Tooltip from '../tooltip/Tooltip';
import Card from '../card/Card';
import Spinner from '../spinner/Spinner';
import { useActions } from '../../hooks/useActions';

interface IProps {
  selectPage: number,
  limit: number,
  themeDark?: boolean,
}

const UsersForm = ({ selectPage, limit, themeDark } : IProps) => {
  const { users, isLoading } = useTypedSelector((state) => state.users);
  const { loadUsersAC } = useActions();
  useEffect(() => {
    loadUsersAC(selectPage, limit);
  }, [selectPage, limit]);
  return (
    !isLoading
      ? (
        <div className="row">
          {users.data.map((item: IUser) => (
            <div className="col-6" key={item.id}>
              <Tooltip themeDark textInfo={item.id}>
                <Link to={`/user/${item.id}`}>
                  <Card
                    themeDark={themeDark}
                    imgUrl={item.picture}
                    cardUserId={item.id}
                    cardUserTitle={item.title}
                    cardUserFirstName={item.firstName}
                    cardUserLastName={item.lastName}
                  />
                </Link>
              </Tooltip>
            </div>
          ))}
        </div>
      )
      : <Spinner themeDark={themeDark} />
  );
};

UsersForm.defaultProps = {
  themeDark: false
};

export default UsersForm;
