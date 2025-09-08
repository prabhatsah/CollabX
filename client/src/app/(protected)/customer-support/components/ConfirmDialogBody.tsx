import React from 'react';

const ConfirmDialogBody = ({ confirmDialog, getUserById }) => {
  const getValueLabel = (type: string, value: string) => {
    if (type === 'status') {
      switch (value) {
        case 'OPEN':
          return 'Open';
        case 'IN_PROGRESS':
          return 'In Progress';
        case 'ON_HOLD':
          return 'On Hold';
        case 'CANCELLED':
          return 'Cancelled';
        case 'RESOLVED':
          return 'Resolved';
        case 'CLOSED':
          return 'Closed';
        default:
          return value;
      }
    } else if (type === 'priority') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else if (type === 'assignee') {
      switch (value) {
        case 'jane-smith':
          return 'Jane Smith';
        case 'john-doe':
          return 'John Doe';
        case 'admin-bob':
          return 'Admin Bob';
        default:
          return value;
      }
    }
    return value;
  };

  if (confirmDialog.type == 'assignee') {
    if (confirmDialog.oldValue === '') {
      return (
        <div className="space-y-1">
          <p>Are you sure want to assign the following user:</p>
          <p>
            <span className="">Name:</span>{' '}
            <span className="font-bold">
              {getUserById(confirmDialog.newValue)?.fullName}
            </span>
          </p>
          <p>
            <span className="">Email:</span>{' '}
            <span className="font-bold">
              {getUserById(confirmDialog.newValue)?.email}
            </span>
          </p>
          <p>
            <span className="">Role:</span>{' '}
            <span className="font-bold">
              {getUserById(confirmDialog.newValue)?.role}
            </span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <p>Are you sure want to update the assign ?</p>
          <div>
            <p>Previous assign:</p>
            <p>
              <span className="">Name:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.oldValue)?.fullName}
              </span>
            </p>
            <p>
              <span className="">Email:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.oldValue)?.email}
              </span>
            </p>
            <p>
              <span className="">Role:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.oldValue)?.role}
              </span>
            </p>
          </div>

          <div>
            <p>New assign:</p>
            <p>
              <span className="">Name:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.fullName}
              </span>
            </p>
            <p>
              <span className="">Email:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.email}
              </span>
            </p>
            <p>
              <span className="">Role:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.role}
              </span>
            </p>
          </div>
        </div>
      );
    }
  } else if (confirmDialog.type === 'lock') {
    return `${confirmDialog.newValue === true ? 'Lock' : 'Unlock'} the ticket ?`;
  } else {
    return `Change the
                ${confirmDialog.label.toLowerCase()} from
                ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.oldValue,
                )}
                to ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.newValue,
                )}
                ?`;
  }

  return (
    <div>
      {confirmDialog.type == 'assignee' ? (
        confirmDialog.oldValue === '' ? (
          <div className="space-y-1">
            <p>Are you sure want to assign the following user:</p>
            <p>
              <span className="">Name:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.fullName}
              </span>
            </p>
            <p>
              <span className="">Email:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.email}
              </span>
            </p>
            <p>
              <span className="">Role:</span>{' '}
              <span className="font-bold">
                {getUserById(confirmDialog.newValue)?.role}
              </span>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Are you sure want to update the assign ?</p>
            <div>
              <p>Previous assign:</p>
              <p>
                <span className="">Name:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.oldValue)?.fullName}
                </span>
              </p>
              <p>
                <span className="">Email:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.oldValue)?.email}
                </span>
              </p>
              <p>
                <span className="">Role:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.oldValue)?.role}
                </span>
              </p>
            </div>

            <div>
              <p>New assign:</p>
              <p>
                <span className="">Name:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.newValue)?.fullName}
                </span>
              </p>
              <p>
                <span className="">Email:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.newValue)?.email}
                </span>
              </p>
              <p>
                <span className="">Role:</span>{' '}
                <span className="font-bold">
                  {getUserById(confirmDialog.newValue)?.role}
                </span>
              </p>
            </div>
          </div>
        )
      ) : (
        `Change the
                ${confirmDialog.label.toLowerCase()} from
                ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.oldValue,
                )}
                to ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.newValue,
                )}
                ?`
      )}
    </div>
  );
};

export default ConfirmDialogBody;
