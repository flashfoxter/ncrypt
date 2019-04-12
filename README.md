# ncrypt
Ncrypt is a zero-knowledge cloud notes app, where all user data is encrypted using AES256 and the encryption key is never exposed to the cloud.  The encryption key is generated using the memory-intensive scrypt key derivation function.  This process is deliberately slow, making it costly and impractical for attackers to brute force passwords against encrypted data, even in the event of a data breach.  

               scrypt         🔑          scrypt         🔑
    password  -------->  encryption key  -------->  cloud password
               N = 18         |           N = 17 
                              v 🔒
    user data  ---------->  AES256  -------------->  cloud storage

The app is hosted on AWS, where the user must sign in to obtain an access token that grants them access to the API.  The cloud password is derived from the encryption key through another round of the scrypt one-way function.  The user's password and encryption key are never exposed, thus neither the website owner nor AWS can view the plaintext context of the user's data.

Only a username and password is required to sign up, and no personal information is ever collected.  Ncrypt aims to set an example of how apps can provide a high level of privacy, anonymity, and security for all users.

Ncrypt is a free service 
