const AuthLayout = ({children}) => {
    return ( 
        <div className="flex h-full items-center justify-center bg-green-300">
            {children}
        </div>
     );
}
 
export default AuthLayout;