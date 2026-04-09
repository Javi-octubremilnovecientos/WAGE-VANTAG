import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  LogOut,
  Lock,
  CreditCard,
  ArrowLeft,
  Pencil,
  Check,
  X,
  Camera,
} from "lucide-react";
import { useUserPlan } from "@/lib/UserPlanContext";
import { Link } from "react-router-dom";

function EditableField({ label, value, type = "text", onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || "");

  const handleSave = () => {
    onSave(val);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        {editing ? (
          <input
            type={type}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full text-sm bg-muted rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring"
            autoFocus
          />
        ) : (
          <p className="text-sm font-medium truncate">
            {type === "password" ? "••••••••" : value || "—"}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setVal(value || "");
              }}
              className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Settings() {
  const { user, plan } = useUserPlan();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    // TODO: Implementar logout con Supabase Auth
    console.log("Logout requested");
    window.location.href = "/";
  };

  const handleSaveField = async (field, value) => {
    // TODO: Implementar actualización de usuario en Supabase
    console.log("Saving field:", field, value);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // TODO: Implementar upload a Supabase Storage
    console.log("Uploading avatar:", file.name);
    setUploading(false);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-lg mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-2xl font-bold">Settings</h1>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-5 mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            {/* Avatar with upload */}
            <div className="relative flex-shrink-0">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-muted flex items-center justify-center cursor-pointer overflow-hidden border-2 border-border hover:border-primary/40 transition-colors"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background"
              >
                {uploading ? (
                  <div className="w-3 h-3 border border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-3 h-3 text-primary-foreground" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm">
                Profile Information
              </h3>
              <p className="text-xs text-muted-foreground">
                Tap photo to change · Edit your details
              </p>
            </div>
          </div>
          <EditableField
            label="Full Name"
            value={user?.full_name}
            onSave={(v) => handleSaveField("full_name", v)}
          />
          <EditableField
            label="Email Address"
            value={user?.email}
            type="email"
            onSave={(v) => handleSaveField("email", v)}
          />
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-heading font-semibold text-sm">Security</h3>
          </div>
          <EditableField
            label="Password"
            value="password"
            type="password"
            onSave={(v) => handleSaveField("password", v)}
          />
        </motion.div>

        {/* Payment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5 mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-heading font-semibold text-sm">
              Payment Method
            </h3>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">
                Current Plan
              </p>
              <p className="text-sm font-medium capitalize">{plan} Plan</p>
            </div>
            <Link
              to="/manage-plan"
              className="text-xs text-primary font-medium hover:underline"
            >
              Manage →
            </Link>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border mt-1">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Saved Card</p>
              <p className="text-sm font-medium text-muted-foreground">
                No card on file
              </p>
            </div>
            <button className="text-xs text-primary font-medium hover:underline">
              Add card →
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
