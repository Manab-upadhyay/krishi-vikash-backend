import jwt from "jsonwebtoken";

export function GenerateJwtToken(newFarmer, req, res) {
    const token = jwt.sign(
        { id: newFarmer._id, email: newFarmer.email },
        "Secretkey123",
        { expiresIn: "1h" }
    );

    // Check if res is provided before setting the cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
            sameSite: "strict",
        });


    return token;
}