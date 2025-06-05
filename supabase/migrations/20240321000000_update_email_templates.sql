-- Update email_templates table to support HTML and CSS content
ALTER TABLE email_templates
DROP COLUMN content;

ALTER TABLE email_templates
ADD COLUMN html_content TEXT NOT NULL DEFAULT '',
ADD COLUMN css_content TEXT NOT NULL DEFAULT '';

-- Add comment to explain the columns
COMMENT ON COLUMN email_templates.html_content IS 'HTML content of the email template';
COMMENT ON COLUMN email_templates.css_content IS 'CSS styles for the email template'; 