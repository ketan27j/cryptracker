import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [dbCredentials, setDbCredentials] = useState({
    host: '',
    port: 5432,
    database: '',
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement database connection logic
    console.log('Database credentials:', dbCredentials);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Database Configuration</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                Host
              </label>
              <input
                id="host"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={dbCredentials.host}
                onChange={(e) =>
                  setDbCredentials({ ...dbCredentials, host: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                Port
              </label>
              <input
                id="port"
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={dbCredentials.port}
                onChange={(e) =>
                  setDbCredentials({ ...dbCredentials, port: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label htmlFor="database" className="block text-sm font-medium text-gray-700">
              Database Name
            </label>
            <input
              id="database"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={dbCredentials.database}
              onChange={(e) =>
                setDbCredentials({ ...dbCredentials, database: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={dbCredentials.username}
              onChange={(e) =>
                setDbCredentials({ ...dbCredentials, username: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="dbPassword" className="block text-sm font-medium text-gray-700">
              Database Password
            </label>
            <input
              id="dbPassword"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={dbCredentials.password}
              onChange={(e) =>
                setDbCredentials({ ...dbCredentials, password: e.target.value })
              }
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Database Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;